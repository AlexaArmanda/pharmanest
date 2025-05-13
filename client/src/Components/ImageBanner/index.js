import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Paper from '@mui/material/Paper';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImageBanner() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 1500,
        margin: 'auto',
        padding: 1,
        overflow: 'hidden',
      }}
    >
      <ImageList
        variant="quilted"
        sx={{
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(4, 1fr)',
          gap: 12,
        }}
        cols={isSmallScreen ? 1 : 4}
        rowHeight={150}
      >
        {itemData.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <ImageListItem
              key={item.img}
              cols={isSmallScreen ? 1 : cols}
              rows={rows}
            >
              <a href={item.link || '#'}>
                <img
                  {...srcset(item.img, 150, 150, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={item.title}
                  position="top"
                  actionPosition="left"
                />
              </a>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Paper>
  );
}

const itemData = [
  {
    img: 'https://i.postimg.cc/CxyYQF2P/Best-remedy.png',
    featured: true,
    link: '/breakfast',
  },
  {
    img: 'https://i.postimg.cc/ZKGR4pf4/bioderma.png',
    featured: true,
    link: '/breakfast',
  },
  {
    img: 'https://i.postimg.cc/1XQdGpZ0/15-Off.png',
    featured: true,
    link: '/breakfast',
  },
  {
    img: 'https://i.postimg.cc/sgTbknkv/for-all-health-problem.png',
    featured: true,
    link: '/breakfast',
  },
];
