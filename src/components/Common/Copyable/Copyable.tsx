import React, { useMemo, useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { ClipboardCopy, ClipboardCheck } from 'lucide-react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Tooltip } from "@mui/material";

const copyTitle = "Click to copy";
const copyState = <ClipboardCopy size="1em" />;

const checkmarkTitle = "Copied";
const checkmarkState = <ClipboardCheck size="1em" />;

export default function Copyable({ size, value, style }: { size?: 's' | 'm', value: string | number, style?: any }): JSX.Element {
  const [icon, setIcon] = useState(copyState);
  const [title, setTitle] = useState(copyTitle);

  const copy = useCallback(() => {
    setIcon(checkmarkState);
    setTitle(checkmarkTitle);

    navigator.clipboard.writeText(String(value));

    setTimeout(() => {
      setIcon(copyState);
      setTitle(copyTitle);
    }, 2_000);
  }, [value]);

  const _style = useMemo(() => ({
    fontSize: size === 's' ? '14px' : "inherit",
    ...style,
  }), [style, size]);

  return <Tooltip title={title}>
    <IconButton aria-label="copy" size="small" className="success" style={_style} onClick={copy} sx={{paddingTop: 0, paddingBottom: 0}}>
      {icon}
    </IconButton>
  </Tooltip>;
}
