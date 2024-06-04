'use client'

import { Button } from "@mui/material";
import { trpc1 } from "../_trpc/client";
import { Data } from "../tabs/summary/page";
import React from 'react'

interface PostProps {
  data : Data 
}

export const Post = ({data}: PostProps) => {

    const post = trpc1.post.useMutation({})

  return (
    <div>
        <Button variant='contained' onClick={async () => {
            if (data) {
              await post.mutate(data);
              
            }
          }}>
          trpc
        </Button>
    </div>
  )
}

