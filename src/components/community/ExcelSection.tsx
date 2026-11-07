import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Plus,
  Table,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';

interface ExcelRow {
  id: number;
  colA: string;
  colB: string;
  colC: string;
  colD: string;
  colE: string;
}

export const ExcelSection: React.FC = () => {
  const { students, groups } = useCommunity();

  // Completely clear empty spreadsheet grid
  const [gridData, setGridData] = useState<ExcelRow[]>([
    { id: 1, colA: '', colB: '', colC: '', colD: '', colE: '' },
    { id: 2, colA: '', colB: '', colC: '', colD: '', colE: '' },
    { id: 3, colA: '', colB: '', colC: '', colD: '', colE: '' },
    { id: 4, colA: '', colB: '', colC: '', colD: '', colE: '' },
    { id: 5, colA: '', colB: '', colC: '', colD: '', colE: '' },
  ]);

  const [activeCellFormula, setActiveCellFormula] = useState('');

  // Cell change handler
  const handleCellChange = (id: number, col: keyof ExcelRow, val: string) => {
    setGridData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [col]: val } : row))
    );
  };

  // Add new row to grid
  const handleAddRow = () => {
    const newId = gridData.length > 0 ? Math.max(...gridData.map((r) => r.id)) + 1 : 1;
    setGridData((prev) => [
      ...prev,
      { id: newId, colA: '', colB: '', colC: '', colD: '', colE: '' },
    ]);
  };

  // Export current grid directly to MS Excel compatible CSV
  const handleExportGrid = () => {
    const headers = ['Student Name (A)', 'Skill Track (B)', 'Theory Marks (C)', 'Practical Marks (D)', 'Average (E)'];
    const rows = gridData.map((r) => [
      `"${r.colA.replace(/"/g, '""')}"`,
      `"${r.colB.replace(/"/g, '""')}"`,
      `"${r.colC.replace(/"/g, '""')}"`,
      `"${r.colD.replace(/"/g, '""')}"`,
      `"${r.colE.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `bca_excel_practice_sheet_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export all students database to MS Excel
  const handleExportStudents = () => {
    const headers = ['Student Name', 'Role', 'Skills', 'Groups', 'Common Task', 'Monthly Progress %'];
    const rows = students.map((s) => {
      const skillsStr = s.skills.map((sk) => `${sk.name} (${sk.experience})`).join('; ');
      const groupsStr = groups.filter((g) => s.joinedGroupIds.includes(g.id)).map((g) => g.name).join('; ');
      return [
        `"${s.name.replace(/"/g, '""')}"`,
        `"${s.role}"`,
        `"${skillsStr.replace(/"/g, '""')}"`,
        `"${groupsStr.replace(/"/g, '""')}"`,
        `"${s.completedCommonTask ? 'Done' : 'Pending'}"`,
        `"${s.monthlyProgress.progressPercentage}%"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `bca_students_master_excel_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[10px] font-mono uppercase tracking-wider text-[#065F46] mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669]" />
              <span>Dedicated Feature • MS Excel Worksheet</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#080808] tracking-tight">
              MS Excel Practical Worksheet
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              BCA Semester 1 Excel spreadsheet practice, live grid simulator, and 1-click MS Excel export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportStudents}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              title="Download all student data to open in MS Excel"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Master Student Excel (.csv)</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE MS EXCEL SPREADSHEET GRID */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#080808] text-white flex items-center justify-center">
                <Table className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#080808]">Interactive Excel Worksheet</h2>
                <div className="text-[11px] text-[#666666]">
                  Type inside cells to test calculations, then download directly to Microsoft Excel on your device.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddRow}
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#D1D5DB] text-xs font-mono text-[#080808] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>

              <button
                onClick={handleExportGrid}
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Worksheet to MS Excel</span>
              </button>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] mb-4 text-xs font-mono">
            <span className="font-bold text-[#666666] px-2 py-1 rounded bg-[#E5E7EB] text-[10px]">
              fx Formula:
            </span>
            <input
              type="text"
              value={activeCellFormula}
              onChange={(e) => setActiveCellFormula(e.target.value)}
              className="flex-1 bg-transparent border-none text-[#080808] focus:outline-none text-xs font-mono"
            />
          </div>

          {/* Excel Grid Table */}
          <div className="overflow-x-auto border border-[#D1D5DB] rounded-xl">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead className="bg-[#F3F4F6] text-[#555555] uppercase text-[10px] select-none">
                <tr>
                  <th className="py-2 px-3 border-r border-b border-[#D1D5DB] text-center w-12 bg-[#E5E7EB]">
                    #
                  </th>
                  <th className="py-2 px-4 border-r border-b border-[#D1D5DB] font-bold text-[#080808]">
                    A (Student Name)
                  </th>
                  <th className="py-2 px-4 border-r border-b border-[#D1D5DB] font-bold text-[#080808]">
                    B (Skill Track)
                  </th>
                  <th className="py-2 px-4 border-r border-b border-[#D1D5DB] font-bold text-[#080808]">
                    C (Theory Marks)
                  </th>
                  <th className="py-2 px-4 border-r border-b border-[#D1D5DB] font-bold text-[#080808]">
                    D (Practical Marks)
                  </th>
                  <th className="py-2 px-4 border-b border-[#D1D5DB] font-bold text-[#080808]">
                    E (Average Score)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {gridData.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFB]">
                    <td className="py-2 px-3 text-center bg-[#F3F4F6] font-bold text-[#666666] border-r border-[#D1D5DB]">
                      {idx + 1}
                    </td>
                    <td className="p-0 border-r border-[#D1D5DB]">
                      <input
                        type="text"
                        value={row.colA}
                        onChange={(e) => handleCellChange(row.id, 'colA', e.target.value)}
                        className="w-full px-3 py-2 bg-transparent focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#080808] text-xs font-mono text-[#080808]"
                      />
                    </td>
                    <td className="p-0 border-r border-[#D1D5DB]">
                      <input
                        type="text"
                        value={row.colB}
                        onChange={(e) => handleCellChange(row.id, 'colB', e.target.value)}
                        className="w-full px-3 py-2 bg-transparent focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#080808] text-xs font-mono text-[#080808]"
                      />
                    </td>
                    <td className="p-0 border-r border-[#D1D5DB]">
                      <input
                        type="text"
                        value={row.colC}
                        onChange={(e) => handleCellChange(row.id, 'colC', e.target.value)}
                        className="w-full px-3 py-2 bg-transparent focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#080808] text-xs font-mono text-[#080808]"
                      />
                    </td>
                    <td className="p-0 border-r border-[#D1D5DB]">
                      <input
                        type="text"
                        value={row.colD}
                        onChange={(e) => handleCellChange(row.id, 'colD', e.target.value)}
                        className="w-full px-3 py-2 bg-transparent focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#080808] text-xs font-mono text-[#080808]"
                      />
                    </td>
                    <td className="p-0">
                      <input
                        type="text"
                        value={row.colE}
                        onChange={(e) => handleCellChange(row.id, 'colE', e.target.value)}
                        className="w-full px-3 py-2 bg-transparent focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#080808] text-xs font-mono font-bold text-[#080808]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
