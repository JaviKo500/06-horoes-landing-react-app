import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation, Link } from 'react-router';

interface BreadcrumbItemProps {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: BreadcrumbItemProps[];
}

export const CustomBreadcrumb = ( { currentPage, breadcrumbs = [] }: Props ) => {
  const {state} = useLocation();
  console.log('<--------------- JK CustomBreadcrumb --------------->');
  console.log(state);
  return (
     <Breadcrumb className="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {
          breadcrumbs.map( ( item ) => {
            return (
              <>
                <BreadcrumbItem key={item.label}>
                  <BreadcrumbLink asChild>
                    <Link to={item.to}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )
          })
        }
        <BreadcrumbItem>
          <BreadcrumbLink>{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
