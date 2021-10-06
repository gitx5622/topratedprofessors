export const columns =  [
    {
        name: 'Order Number',
        selector: row => row.order_number,
        grow: 1.5,
        sortable: true,
    },
    {
        name: 'Deadline',
        selector: row => row.deadline,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Type',
        selector: row => row.type.name,
        grow: 2,
        sortable: true,
        left: true,
        conditionalCellStyles: [
            {
                when: row => row.type.name < 300,
                style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.type.name >= 300 && row.calories < 400,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.type.name >= 400,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'not-allowed',
                    },
                },
            },
        ],
    },
    {
        name: 'Pages',
        selector: row => row.page.no_of_page,
        sortable: true,
        center: true,
        conditionalCellStyles: [
            {
                when: row => row.page.no_of_page <= 5,
                style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.page.no_of_page > 5 && row.fat < 10,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.page.no_of_page > 10,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'not-allowed',
                    },
                },
            },
        ],
    },
    {
        name: 'Amount',
        selector: row => row.amount,
        grow: 1.5,
        sortable: true,
        left: true,
    },
];