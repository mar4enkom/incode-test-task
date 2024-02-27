import {screen} from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs.tsx";
import {BreadcrumbsList} from "./types.ts";
import {render} from "../../../test/utils.tsx";

export const mockBreadcrumbsList: BreadcrumbsList = [
    { text: "Home", link: "/" },
    { text: "Category", link: "/category" },
    { text: "Subcategory", link: "/category/subcategory" },
    { text: "Current Page" },
];

describe('Breadcrumbs component', () => {
    test('renders breadcrumbs with correct items', () => {
        render(<Breadcrumbs items={mockBreadcrumbsList} />);

        mockBreadcrumbsList.forEach((item) => {
            const breadcrumbItem = screen.getByText(item.text);
            expect(breadcrumbItem).toBeInTheDocument();

            if (item.link) {
                expect(breadcrumbItem).toHaveAttribute('href', item.link);
            }
        });
    });

    test('last item should have active class i.e. be inactive link', () => {
        render(<Breadcrumbs items={mockBreadcrumbsList} />);

        const lastBreadcrumbItem = screen.getByText(mockBreadcrumbsList[mockBreadcrumbsList.length - 1].text);
        expect(lastBreadcrumbItem).toHaveClass('active');
    });
});
