import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {BreadcrumbItem} from "./BreadcrumbItem.tsx";
import {BreadcrumbsItem} from "./types.ts";

interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const breadcrumbItemList = items.map((item, index) =>
        <BreadcrumbItem key={item.link} {...item} active={index === items.length - 1} />
    );

    return (
        <Breadcrumb>
            {breadcrumbItemList}
        </Breadcrumb>
    );
};



export default Breadcrumbs;
