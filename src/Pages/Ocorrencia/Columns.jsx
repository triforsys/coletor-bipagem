import Tooltip from '@/components/utils/Tooltip';
import { Checkbox } from '@/components/ui/checkbox';

export const columns = [
  {
    accessorKey: 'Checkbox',
    header: ({ table }) => (
      <Tooltip message="Selecionar todos">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </Tooltip>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: 'Status',
    accessorKey: 'Status',
    cell: ({ row }) => (
      <Tooltip
        message={
          row.getValue('Status') === 'S'
            ? 'OK'
            : row.getValue('Status') === 'N'
              ? 'ERRO'
              : 'PENDENTE'
        }
      >
        <div
          className={`${
            row.getValue('Status') === 'S'
              ? 'bg-green-500 rounded-full w-5 h-5'
              : row.getValue('Status') === 'N'
                ? 'bg-red-500 rounded-full w-5 h-5'
                : 'bg-gray-500 rounded-full w-5 h-5'
          }`}
        ></div>
      </Tooltip>
    ),
  },
  {
    header: 'Sequência',
    accessorKey: 'id_Movimento',
  },
  {
    header: 'CNPJ Emitente',
    accessorKey: 'CNPJ_Emitente',
  },
  // {
  //   header: 'CNPJ Transportadora',
  //   accessorKey: 'CNPJTransportadora',
  // },
  {
    header: 'CNPJ Cliente',
    accessorKey: 'CNPJ_Cliente',
  },
  {
    header: 'CNPJ',
    accessorKey: 'CNPJForn',
  },
  {
    header: 'Cliente',
    accessorKey: 'Cliente',
  },
  {
    header: 'ChaveNF',
    accessorKey: 'ChaveNF',
  },

  {
    header: 'NotaFiscal',
    accessorKey: 'NotaFiscal',
  },
  {
    header: 'DataBaixa',
    accessorKey: 'DataBaixa',
  },
  {
    header: 'Codigo',
    accessorKey: 'Codigo',
  },
  {
    header: 'Ocorrencia',
    accessorKey: 'Ocorrencia',
  },
  {
    header: 'Canhoto',
    accessorKey: 'Canhoto',
  },
  {
    header: 'Dt.Integra',
    accessorKey: 'dt_Integra',
  },
  {
    header: 'Msg Api',
    accessorKey: 'msg_Api',
    cell: ({ row }) => (
      <div className="whitespace-pre-wrap">{row.getValue('msg_Api')}</div>
    ),
  },
];
