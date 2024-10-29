import React from 'react';
import IssueItem from "../components/IssueItem";
import BookItem from "../components/BookItem";
export default function SearchResultItem(props) {
    return (
        <>
            {
                props.info.issueTitle ? <IssueItem issueInfo={props.info} /> : <BookItem bookInfo={props.info} />
            }
        </>
    )
}
