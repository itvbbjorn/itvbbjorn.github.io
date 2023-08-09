// useNameScraper.ts
import { useCallback, useState } from 'react';
import axios from 'axios';

const useNameScraper = () => {
  const searchUrl = 'http://www.masterunitlist.info/Unit/Filter?Types=18';
  const [unitStrings, setUnitStrings] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios.get(searchUrl)
      .then(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));
        const filteredLinks = links
          .filter(link => link.href.includes('/Unit/Details/'))
          .map(link => link.innerText);

        setUnitStrings(filteredLinks);
        setLoading(false);
      })
      .catch(error => {
        console.error('An error occurred:', error);
        setLoading(false);
      });
  }, [searchUrl]);

  return { unitStrings, fetchData, isLoading };
};

export default useNameScraper;
