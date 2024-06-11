import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronRight, CloudUpload } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import Tooltip from '../Tooltip';
import Select from '../Select';

const options = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
];

// const columns = [
//   {
//     accessorKey: 'Checkbox',
//     header: ({ table }) => (
//       <Tooltip message="Selecionar todos">
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && 'indeterminate')
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </Tooltip>
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//   },
//   {
//     header: 'Nome',
//     accessorKey: 'nome',
//   },
//   {
//     header: 'Email',
//     accessorKey: 'email',
//   },
// ];
// const DATA = [
//   { nome: 'Nome1', email: 'email1@example.com' },
//   { nome: 'Nome2', email: 'email2@example.com' },
//   { nome: 'Nome3', email: 'email3@example.com' },
//   { nome: 'Nome4', email: 'email4@example.com' },
//   { nome: 'Nome5', email: 'email5@example.com' },
//   { nome: 'Nome6', email: 'email6@example.com' },
//   { nome: 'Nome7', email: 'email7@example.com' },
//   { nome: 'Nome8', email: 'email8@example.com' },
//   { nome: 'Nome9', email: 'email9@example.com' },
// ];

export default function TableData({ upload, textUpload, columns, data = [] }) {
  // const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 100, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row,
          ),
        ),
    },
  });
  const handleRowsPerPage = (value) => {
    setPagination((prev) => ({ pageIndex: 0, pageSize: value }));
  };
  // console.log(table);
  // console.log(pagination);
  // console.log('total de linhas',table.getRowCount());
  // console.log(table.getState().pagination);
  // console.log(table.getSelectedRowModel().rows);
  return (
    <>
      <div className="p-6 max-w-full mx-auto space-y-4">
        {upload && (
          <div className="flex justify-end items-center">
            <Tooltip message={textUpload}>
              <Button
                onClick={() => upload(table.getSelectedRowModel().rows)}
                variant=""
                size="icon"
                className="bg-emerald-400 text-white hover:bg-emerald-600"
              >
                <CloudUpload className="size-4" />
              </Button>
            </Tooltip>
          </div>
        )}

        <div className="relative rounded-lg border  p-2 bg-white ">
          <div
            className={` max-w-[${table.getTotalSize()}px] relative max-h-[70vh] overflow-auto whitespace-nowrap`}
          >
            <Table className="">
              <TableHeader className="border-b sticky top-0 bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow>
                    {headerGroup.headers.map((header, index) => (
                      <TableHead key={index} className="">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={index}
                      data-state={row.getIsSelected() && 'selecionado'}
                      className=""
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell key={index}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between p-1 mt-2">
            <span className=" text-sm text-muted-foreground">
              {table.getSelectedRowModel().rows.length || 0} de{' '}
              {table.getRowCount()} linha(s) selecionada(s)
            </span>
            <div className="flex gap-2">
              <Select
                options={options}
                InitialTextOption="Linhas por página"
                valueSelected={pagination.pageSize}
                size="50"
                handleValueChange={handleRowsPerPage}
              />
              <Tooltip message="Página anterior">
                <Button variant="outline" size="icon">
                  <ChevronLeft
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="size-4"
                  />
                </Button>
              </Tooltip>
              <Tooltip message="Página seguinte">
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  variant="outline"
                  size="icon"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
