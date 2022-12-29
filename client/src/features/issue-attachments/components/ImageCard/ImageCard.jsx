/* eslint-disable react/prop-types */
import { ImageListItem, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useGetIssueAttachmentQuery } from '../../api/issue-attachments.api';

export default function ImageCard({ attachmentId, issueId }) {
  const [signedUrl, setSignedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { data, isSuccess } = useGetIssueAttachmentQuery({
    issueId,
    attachmentId,
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (isSuccess) {
      setIsLoading(false);
      setSignedUrl(data.signedUrl);
    }
  }, [data]);

  return (
    <ImageListItem>
      {isLoading ? (
        <Skeleton height="100%" width="100%" />
      ) : (
        <img
          alt="imageTag"
          height="100%"
          loading="lazy"
          src={signedUrl}
          style={{ borderRadius: '8px' }}
          width="100%"
        />
      )}
    </ImageListItem>
  );
}
