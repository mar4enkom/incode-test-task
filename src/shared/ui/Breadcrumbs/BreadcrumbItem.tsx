import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {BreadcrumbsItem} from "./types.ts";

interface BreadcrumbsItemProps extends BreadcrumbsItem {
    active: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbsItemProps> = ({text, link, active}) => {
    const content = active ? text : <a href={link}>{text}</a>;

    return (
        <Breadcrumb.Item active={active}>
            {content}
        </Breadcrumb.Item>
    )
}