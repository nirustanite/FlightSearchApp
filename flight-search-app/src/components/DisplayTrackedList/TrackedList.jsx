import React, { useEffect, useState } from 'react';
import { Header, Table } from 'semantic-ui-react';
import TrackedListItem from './TrackedListItem';
import './style.css';

const TrackedList = ({ trackedList, itemsPerPage }) => {

    const [currentPage, setcurrentPage] = useState(1);

    const pageNumberLimit = 5;
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    useEffect(() => {
        setcurrentPage(1);
    },[trackedList]);

    const pages = [];
    for (let i = 1; i <= Math.ceil(trackedList.length / itemsPerPage); i++) {
      pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = trackedList.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (id) => {
        setcurrentPage(Number(id));
    };
   
    const renderPageNumbers = pages.map((pageNum) => {
        if (parseInt(`${pageNum}`) < maxPageNumberLimit + 1 && parseInt(`${pageNum}`) > minPageNumberLimit) {
          return (
            <li
              key={pageNum}
              id={`${pageNum}`}
              onClick={() => handleClick(`${pageNum}`)}
              className={currentPage === parseInt(`${pageNum}`) ? 'active' : undefined}
            >
              {pageNum}
            </li>
          );
        } else {
          return null;
        }
      });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    
    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    return(
        <React.Fragment>
            {trackedList.length >= 1 ? (
                <>
                    <Table striped color='blue'>
                        <Table.Header >
                            <Table.Row style={{ textAlign: 'center' }}>
                                <Table.HeaderCell>Flight Name</Table.HeaderCell>
                                <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                <Table.HeaderCell>Flight Direction</Table.HeaderCell>
                                <Table.HeaderCell>Terminal</Table.HeaderCell>
                                <Table.HeaderCell>Scheduled Date</Table.HeaderCell>
                                <Table.HeaderCell>Scheduled Time</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentItems.map(list => {
                                return <Table.Row key={list.id} style={{ textAlign: 'center' }}>
                                    <TrackedListItem flight={list}/>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    {currentItems.length >= 1 && <ul className='pageNumbers'>
                        <li>
                        <button
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0] ? true : false}
                        >
                            Prev
                        </button>

                        </li>
                            {renderPageNumbers}
                        <li>

                        <button
                            onClick={handleNextbtn}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}
                        >
                            Next
                        </button>
                        </li>
                    </ul>}
                </>
            ) : (
                <Header as="h4"> No tracked flights, go to home and track some flights.</Header>
            )}
        </React.Fragment>
    );
};

export default TrackedList;