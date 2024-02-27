import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {BreadcrumbItem} from "./BreadcrumbItem.tsx";
import {BreadcrumbsList} from "./types.ts";

interface BreadcrumbsProps {
    items: BreadcrumbsList;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const breadcrumbItemList = items.map((item, index) =>
        <BreadcrumbItem key={item.link ?? item.text} {...item} active={index === items.length - 1} />
    );

    return (
        <Breadcrumb>
            {breadcrumbItemList}
        </Breadcrumb>
    );
};



export default Breadcrumbs;
