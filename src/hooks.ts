import React, { useEffect, useState } from 'react';
import { Query, RDoc } from './redisstore';

const never = 'hello';
export function useCollectionData(query: Query, options: { idField?: string }) {
  const [docs, setDocs] = useState([] as any[]);

  useEffect(() => {
    console.log('in effect');
    const unsub = query.docs.subscribe((documents) => {
      console.log('got doc update', documents);
      let data = documents.map((doc) => doc.data);
      if (options.idField) {
        data = data.map((d, i) => {
          d[options.idField!] = documents[i].documentID;
          return d;
        });
      }
      setDocs(data);
    });
    return () => unsub.unsubscribe();
  }, [never]);

  return [docs];
}
