import { useLocation, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Navbar from '@/components/layout/Navbar'
import { ButtonBack } from '@/components/layout/ButtonBack'
import { useLoadingToFetch } from '@/hook/useLoadingToFetch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Summary() {
  const location = useLocation()
  const [, , collectId, transportId] = location.pathname.split('/')

  const { data, isFetched } = useQuery({
    queryKey: ['summaryList'],
    queryFn: async () =>
      await useLoadingToFetch('Buscando dados...', `/resumo`, 'post', {
        collectId,
        transportId,
      }),
    initialData: [],
  })

  return (
    <Navbar>
      <div className="flex justify-center gap-2 mt-4 font-poppins">
        <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4 w-full xl:max-w-screen-xl">
          <div className="w-[370px] sm:w-full">
            <div className="w-full flex justify-center relative mb-6 items-center">
              <ButtonBack />
              <div className="flex justify-center">
                <h1 className="text-2xl text-neutral-500">
                  Resumo: <br className='sm:hidden'></br>{collectId} / {transportId}
                </h1>
              </div>
            </div>
          </div>

          <div className='w-full'>
            Total de Volumes Lidos:{' '}
            {data.length
              ? data.reduce((acc, item) => acc + item.Volumes, 0)
              : ''}
          </div>

          <div className='w-full overflow-auto card-shadow rounded-md bg-white'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Região</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Volumes</TableHead>
                  <TableHead>Código de barras</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length ? (
                  data.map((item) => (
                    <TableRow
                      className="odd:bg-gray-100 even:bg-white"
                      key={item.Regiao + item.Produto}
                    >
                      <TableCell>{item.regiao}</TableCell>
                      <TableCell>{item.produto}</TableCell>
                      <TableCell>{item.Volumes}</TableCell>
                      <TableCell>78969862958437896986295843</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="h-24 text-center rounded-md bg-gray-100"
                    >
                      {isFetched && <>Sem resultados.</>}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
