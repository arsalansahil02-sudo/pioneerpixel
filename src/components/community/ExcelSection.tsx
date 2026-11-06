import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Plus,
  Sparkles,
  Calculator,
  BookOpen,
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
  const { students, groups, commonTask } = useCommunity();

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

  // Download Sample Attendance Template
  const handleDownloadAttendanceTemplate = () => {
    const headers = ['Roll No', 'Student Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Total Present'];
    const rows: string[][] = [];

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `bca_sample_attendance_template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formulas = [
    {
      name: 'SUM',
      syntax: '=SUM(number1, [number2], ...)',
      example: '=SUM(C2:C6)',
      desc: 'Adds all numbers in a range of cells.',
    },
    {
      name: 'AVERAGE',
      syntax: '=AVERAGE(number1, [number2], ...)',
      example: '=AVERAGE(C2:D6)',
      desc: 'Returns the numerical average (arithmetic mean) of arguments.',
    },
    {
      name: 'IF',
      syntax: '=IF(logical_test, [value_if_true], [value_if_false])',
      example: '=IF(E2>=40, "Pass", "Fail")',
      desc: 'Specifies a logical test to perform and returns conditional results.',
    },
    {
      name: 'VLOOKUP',
      syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
      example: '=VLOOKUP("Aman Verma", A2:E6, 5, FALSE)',
      desc: 'Looks for a value in the leftmost column of a table and returns a value in the same row.',
    },
    {
      name: 'COUNTIF',
      syntax: '=COUNTIF(range, criteria)',
      example: '=COUNTIF(C2:C6, ">=80")',
      desc: 'Counts the number of cells within a range that meet the given criteria.',
    },
    {
      name: 'CONCATENATE',
      syntax: '=CONCATENATE(text1, [text2], ...)',
      example: '=CONCATENATE(A2, " - ", B2)',
      desc: 'Joins two or more text strings into one string.',
    },
  ];

  const shortcuts = [
    { key: 'Alt + =', desc: 'Automatically inserts the SUM formula (AutoSum)' },
    { key: 'F4', desc: 'Toggles absolute/relative reference ($A$1, A$1, $A1, A1)' },
    { key: 'Ctrl + Shift + L', desc: 'Turn AutoFilters on or off for the table' },
    { key: 'Ctrl + Arrow', desc: 'Jump to the edge of data regions in a direction' },
    { key: 'Ctrl + 1', desc: 'Opens the Format Cells dialog box' },
    { key: 'Ctrl + Z / Y', desc: 'Undo or redo the previous spreadsheet action' },
  ];

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[10px] font-mono uppercase tracking-wider text-[#065F46] mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669]" />
              <span>Dedicated Feature • MS Excel Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#080808] tracking-tight">
              MS Excel Practical & Data Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              BCA Semester 1 Excel spreadsheet practice, live grid simulator, formulas cheatsheet, and 1-click MS Excel export.
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

        {/* 1. INTERACTIVE MS EXCEL SPREADSHEET GRID */}
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

        {/* 2. DOWNLOADABLE EXCEL TEMPLATES CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[#080808]">
                  Student Attendance Register Template
                </h3>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                Ready-to-use MS Excel template formatted for BCA daily lecture attendance, presence counting formulas, and percentage tracking.
              </p>
            </div>
            <button
              onClick={handleDownloadAttendanceTemplate}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Attendance Template (.csv)</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[#080808]">
                  Active Common Task Progress Sheet
                </h3>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                Export current submissions and completion status for: "{commonTask.title}". Directly readable in MS Excel.
              </p>
            </div>
            <button
              onClick={handleExportStudents}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808] hover:bg-[#F3F4F6] text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Common Task Export (.csv)</span>
            </button>
          </div>
        </div>

        {/* 3. CORE MS EXCEL BCA FORMULAS CHEATSHEET */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-10 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E7EB] mb-6">
            <BookOpen className="w-5 h-5 text-[#080808]" />
            <div>
              <h2 className="text-lg font-bold text-[#080808]">Essential BCA Semester 1 MS Excel Formulas</h2>
              <div className="text-xs text-[#666666]">
                Core formulas required for university exams, lab practicals, and real data analysis.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formulas.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2 hover:border-[#080808] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#080808] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#D1D5DB]">
                    {f.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#666666]">Formula #{idx + 1}</span>
                </div>

                <div className="font-mono text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  {f.example}
                </div>

                <div className="text-[11px] font-mono text-[#555555]">{f.syntax}</div>

                <p className="text-xs text-[#555555] leading-relaxed pt-1 border-t border-[#E5E7EB]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MS EXCEL KEYBOARD SHORTCUTS */}
        <div className="rounded-3xl bg-[#080808] text-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-white">High-Speed MS Excel Shortcuts</h2>
              <div className="text-xs text-[#9CA3AF]">
                Keyboard shortcuts to save hours during data entry and spreadsheet editing.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
            {shortcuts.map((sc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#141414] border border-[#262626] flex flex-col justify-between"
              >
                <div className="inline-block px-2 py-1 rounded bg-[#262626] text-white font-bold text-[11px] w-fit mb-2">
                  {sc.key}
                </div>
                <div className="text-[#9CA3AF] text-[11px] leading-relaxed">{sc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
