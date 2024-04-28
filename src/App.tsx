import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { getData, removeDuplicates } from './helper'
import { ApiCharactersData, Character } from './types'
import { Option } from './components'

const Container = styled.div`
  margin: 5vw auto;
  width: 60vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const App = () => {
  const [options, setOptions] = useState<Character[] | undefined>(undefined)
  const [selectedOptions, setSelectedOptions] = useState<Character[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)


  useEffect(() => {
    setIsLoading(true)
    getData(
      `https://rickandmortyapi.com/api/character/?name=${input}&page=${page}`,
    )
      .then((data: ApiCharactersData) => {
        setOptions((prev) =>
          removeDuplicates(
            [
              ...selectedOptions,
              ...(data?.results ? [...(prev || []), ...data.results] : []),
            ],
            'id',
          ),
        )
        setIsLoading(false)
      })
      .catch((err) => {
        setOptions(undefined)
        setIsLoading(false)
        console.log('Error -->', err)
      })
  }, [input, page])

  return (
    <Container>
      <h1>Rick And Morty</h1>
      <img
        src={
          'https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b'
        }
        alt="Rick And Morty"
      />
      <Select
        className="basic-multi-select"
        classNamePrefix="select"
        name="rickAndMorty"
        isMulti={true}
        isSearchable={true}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        isLoading={isLoading}
        onMenuScrollToBottom={() => setPage((prev) => prev + 1)}
        getOptionValue={(options) => String(options['id'])}
        getOptionLabel={(options) => options['name']}
        onInputChange={(val: string) => {
          setInput(val)
          if (!val.length) setPage(1)
        }}
        onChange={(values) => {
          setSelectedOptions((prev) => {
            const newSelectedOptions = removeDuplicates(
              [...prev, ...(values as Character[])],
              'id',
            )
            setOptions((prev) =>
              removeDuplicates([...newSelectedOptions, ...(prev || [])], 'id'),
            )
            return newSelectedOptions
          })
        }}
        value={selectedOptions}
        options={options}
        formatOptionLabel={(option: Character) => {
          return (
            <Option
              id={option.id}
              imgSrc={option.image}
              name={option.name
                .toLocaleLowerCase()
                .replace(
                  new RegExp(input.toLocaleLowerCase(), 'gi'),
                  `<b>${input}</b>`,
                )}
              episodeCont={option.episode.length}
              isSelected={
                !!selectedOptions.find(
                  (selectedOption) => selectedOption.id === option.id,
                )
              }
              onChange={(id) => {
                const selectedOption = selectedOptions.find(
                  (selectedOption) => selectedOption.id === id,
                )
                if (selectedOption)
                  setSelectedOptions((prev) =>
                    prev.filter((item) => item.id != selectedOption.id),
                  )
                else {
                  setSelectedOptions((prev) => {
                    const newSelectedOptions = removeDuplicates(
                      [
                        ...prev,
                        options?.find(
                          (option) => option.id === id,
                        ) as Character,
                      ],
                      'id',
                    )
                    setOptions((prev) =>
                      removeDuplicates(
                        [...newSelectedOptions, ...(prev || [])],
                        'id',
                      ),
                    )
                    return newSelectedOptions
                  })
                }
              }}
            />
          )
        }}
      />
    </Container>
  )
}

export default App
