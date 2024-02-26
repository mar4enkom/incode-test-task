import {BreadcrumbsList} from "../../../shared/ui/Breadcrumbs/types.ts";
import {Repository} from "../types.ts";

export function getRepositoryBreadCrumbs(repositoryInfo: Repository | undefined): BreadcrumbsList {
    const breadcrumbsList: BreadcrumbsList = [];

    if(repositoryInfo == null) return [];

    breadcrumbsList.push({
        text: repositoryInfo.ownerName,
        link: repositoryInfo.ownerUrl,
    });

    breadcrumbsList.push({
        text: repositoryInfo.repositoryName,
        link: repositoryInfo.repositoryUrl,
    });

    breadcrumbsList.push({
        text: `⭐ ${repositoryInfo.starsNumber}`,
    });

    return breadcrumbsList;
}