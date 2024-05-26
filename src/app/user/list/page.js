'use client'

import Link from "next/link";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";

export const tableColumns = [
    {
        name: 'First name',
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: 'Last name',
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: 'Contact number',
        selector: (row) => `${row.contactNumber}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-light me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <CiEdit/>
                    </Button>
                    <Button className="btn btn-light" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        })
                    }}>
                        <CiTrash/>
                    </Button>
                </>
            );
        },
        sortable: false
    }
]

export default function UserList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const{state} = useListActions();

    const {
        getData,
        loading,
        data
    } = useListData(`user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
        }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload)
        {
            getData(`user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
        }
    }, [state]);



    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return (
        <>
            {/*<Row>*/}
            {/*    <h5>Email: {state.email}</h5>*/}
            {/*</Row>*/}

            {data != null && <DataTable data={data.users}
                                        columns={tableColumns}
                                        striped={true}
                                        noHeader={true}
                                        pagination
                                        paginationServer
                                        progressPending={loading}
                                        paginationTotalRows={data.totalElements}
                                        onChangePage={handlePageChange}
                                        onChangeRowsPerPage={handlePerRowsChange}
                                        progressComponent={<Spinner color="danger">Ocitavanje...</Spinner>}
                                        highlightOnHover
            />}
            <AllUserDialogs />
        </>
    );
}