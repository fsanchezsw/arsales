export interface Filter {
    where?: any;
    include?: string | string[] | any[] | any;
    order?: string | string[];
    offset?: number;
    limit?: number;
    fields?: any;
}
