// UniversalTable.jsx
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import './UniversalTable.css'; // Import the correct CSS file

const UniversalTable = ({ columns, data }) => {
  return (
    <div className="universal-table-container"> {/* Updated class for the container */}
      <Table aria-label="Data table" className="universal-table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id || item.parameter}>
              {(columnKey) => (
                <TableCell>{item[columnKey]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UniversalTable;
