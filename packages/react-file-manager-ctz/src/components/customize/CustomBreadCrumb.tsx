import React, { useEffect, useRef, useState } from "react";
import { Box, Breadcrumbs, styled, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AutoSizer from "react-virtualized-auto-sizer";

// Styled
const BreadcrumbsBlock = styled(Breadcrumbs)(() => ({
  "& .breadcrumbsText": {
    fontSize: "12px",
    fontWeight: 400,
  },
}));

const ParentContainer = styled(Box)(({ theme }) => ({}));

interface FilePathProps {
  path: string;
}

const CustomBreadCrumb: React.FC<FilePathProps> = ({ path }) => {
  const linkParts = path.split("/");
  const [breadcrumbsContent, setBreadcrumbsContent] = useState(linkParts);
  const breadcrumb = useRef<HTMLDivElement | null>(null);
  const [breadcrumbWidth, setBreadcrumbWidth] = useState(0);

  const calculateWidth = () => {
    if (breadcrumb.current) {
      setBreadcrumbWidth(breadcrumb.current.offsetWidth);
    }
  };

  useEffect(() => {
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, [breadcrumbsContent]);

  const getVisibleBreadcrumbs = () => {
    const totalWidth = breadcrumbWidth;
    let visibleItems = [...breadcrumbsContent];
    
    // Check if the width allows all breadcrumbs to be displayed
    let currentWidth = 0;
    const breadcrumbWidths: number[] = []; // Array to store the width of each breadcrumb item
    
    // We can measure each breadcrumb item and accumulate the width
    const measureBreadcrumbWidths = () => {
      breadcrumbWidths.length = 0; // Reset the array on recalculation
      visibleItems.forEach((item, index) => {
        const breadcrumbElement = document.getElementById(`breadcrumb-${index}`);
        if (breadcrumbElement) {
          breadcrumbWidths.push(breadcrumbElement.offsetWidth);
        }
      });
    };

    measureBreadcrumbWidths();
    
    currentWidth = breadcrumbWidths.reduce((acc, width) => acc + width, 0);
    
    if (currentWidth > totalWidth) {
      // If the width exceeds the parent container, show the first and last item
      return [visibleItems[0], visibleItems[visibleItems.length - 1]];
    } else {
      // Else, show all items
      return visibleItems;
    }
  };

  return (
    <AutoSizer>
      {({ height, width }: { width: number; height: number }) => {
        setBreadcrumbWidth(width);

        const visibleBreadcrumbs = getVisibleBreadcrumbs();
        return (
          <ParentContainer width={width} height={height}>
            <BreadcrumbsBlock
              ref={breadcrumb}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {visibleBreadcrumbs.map((item, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  className="breadcrumbsText"
                  id={`breadcrumb-${index}`}
                >
                  {item}
                </Typography>
              ))}
            </BreadcrumbsBlock>
          </ParentContainer>
        );
      }}
    </AutoSizer>
  );
};

export default CustomBreadCrumb;
