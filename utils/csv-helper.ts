import * as fs from 'fs';
import * as path from 'path';

export class CSVHelper {
  
  /**
   * Parse CSV file and return rows as objects
   */
  static parseCSV(filePath: string): Record<string, string>[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Skip SEP line if present
    const startIndex = lines[0].startsWith('SEP=') ? 1 : 0;
    const headers = lines[startIndex].split(',').map(h => h.trim());
    const rows: Record<string, string>[] = [];
    
    for (let i = startIndex + 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index]?.replace(/^"|"$/g, '').trim() || '';
      });
      
      rows.push(row);
    }
    
    return rows;
  }

  /**
   * Get the first row from CSV file
   */
  static getFirstRow(filePath: string): Record<string, string> | null {
    const rows = this.parseCSV(filePath);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Compare findings data with CSV row
   */
  static compareFindingsWithCSV(
    findingsData: { findingName: string; timestamp: string; status: string },
    csvFilePath: string
  ): { match: boolean; differences: string[] } {
    const firstRow = this.getFirstRow(csvFilePath);
    
    if (!firstRow) {
      return { match: false, differences: ['CSV file is empty or cannot be parsed'] };
    }

    const differences: string[] = [];

    // Compare Finding Name
    const csvFindingName = firstRow['Finding Name'] || '';
    if (findingsData.findingName !== csvFindingName) {
      differences.push(
        `Finding Name mismatch:\n  UI: "${findingsData.findingName}"\n  CSV: "${csvFindingName}"`
      );
    }

    // Compare Timestamp - both should be in format: DD/MM/YYYY - HH:MM:SS
    const csvTimestamp = firstRow['Timestamp'] || '';
    if (findingsData.timestamp !== csvTimestamp) {
      differences.push(
        `Timestamp mismatch:\n  UI: "${findingsData.timestamp}"\n  CSV: "${csvTimestamp}"`
      );
    }

    // Compare Status
    const csvStatus = firstRow['Status'] || '';
    if (findingsData.status !== csvStatus) {
      differences.push(
        `Status mismatch:\n  UI: "${findingsData.status}"\n  CSV: "${csvStatus}"`
      );
    }

    return {
      match: differences.length === 0,
      differences
    };
  }

  /**
   * Get the most recent CSV file from downloads folder
   */
  static getLatestCSVFile(downloadsFolder: string, filenamePattern: string = 'findings_csv_report'): string | null {
    if (!fs.existsSync(downloadsFolder)) {
      return null;
    }

    const files = fs.readdirSync(downloadsFolder)
      .filter(file => file.includes(filenamePattern) && file.endsWith('.csv'))
      .map(file => ({
        name: file,
        path: path.join(downloadsFolder, file),
        time: fs.statSync(path.join(downloadsFolder, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    return files.length > 0 ? files[0].path : null;
  }
}
