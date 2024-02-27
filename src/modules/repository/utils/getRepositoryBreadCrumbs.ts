import {BreadcrumbsList} from "../../../shared/ui/Breadcrumbs/types.ts";
import {Repository} from "../types.ts";

function formatStarsNumber(numberToFormat: number): string {
    if (numberToFormat >= 1000 && numberToFormat < 1000000) {
        return (numberToFormat / 1000).toFixed(0) + " K";
    }
    return numberToFormat.toString();
}

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
        text: `⭐ ${formatStarsNumber(repositoryInfo.starsNumber)} stars`,
    });

    return breadcrumbsList;
}