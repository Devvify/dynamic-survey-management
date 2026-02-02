import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/Pagination";

interface Column<T> {
  header: string;
  accessorKey?: string;
  accessorFn?: (row: T) => any;
  cell?: (context: { row: T; value: any }) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title?: string;
  titleIcon?: React.ReactNode;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage?: number;
    onPageChange: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
  };
  getRowKey: (row: T) => string | number;
}

export function DataTable<T>({
  title,
  titleIcon,
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = "No data found",
  pagination,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <Card>
        {title && (
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              {titleIcon}
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-0">
          {loading && (
            <p className="text-sm text-muted-foreground py-12 text-center">
              Loading...
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 py-12 text-center">{error}</p>
          )}

          {!loading && !error && data.length === 0 && (
            <p className="text-sm text-muted-foreground py-12 text-center">
              {emptyMessage}
            </p>
          )}

          {!loading && !error && data.length > 0 && (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2">
                    {columns.map((column, index) => (
                      <TableHead
                        key={index}
                        className={`h-12 px-4 text-left align-middle font-semibold ${column.className}`}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={getRowKey(row)}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      {columns.map((column, index) => {
                        // Get the cell value
                        let value: any;
                        if (column.accessorFn) {
                          value = column.accessorFn(row);
                        } else if (column.accessorKey) {
                          // Support nested keys like "submitter.name"
                          const keys = column.accessorKey.split(".");
                          value = keys.reduce(
                            (obj: any, key) => obj?.[key],
                            row,
                          );
                        }

                        return (
                          <TableCell
                            key={index}
                            className={`px-4 py-4 ${column.className}`}
                          >
                            {column.cell
                              ? column.cell({ row, value })
                              : value !== undefined && value !== null
                                ? String(value)
                                : "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
          perPage={pagination.perPage}
          onPageChange={pagination.onPageChange}
          onPerPageChange={pagination.onPerPageChange}
        />
      )}
    </div>
  );
}
