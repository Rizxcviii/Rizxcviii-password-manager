import { Box, Button, Flex, Input, Label } from "@theme-ui/components"
import React, { useState } from "react"
import { createPortal } from "react-dom"
import { Modal } from "../ui"

const appRoot = () =>
  typeof document !== "undefined" && document.getElementById("root")

const FilterModal = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false)

  const handleChangeFilter = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    setFilters({
      ...filters,
      separator: form.get("separator") || ",",
      remove: form.get("remove") || "",
      upperCase: form.get("upperCase") || false,
      lowerCase: form.get("lowerCase") || false,
      numbers: form.get("numbers") || false,
      symbols: form.get("symbols") || false
    })
    setShowFilter(false)
  }

  if (!showFilter) {
    return (
      <Button onClick={() => setShowFilter(true)} mb={2}>
        Filter
      </Button>
    )
  }

  return createPortal(
    <Modal onClose={() => setShowFilter(false)} width="100%">
      <Box
        as="form"
        sx={{
          bg: "white",
          border: "1px solid",
          borderRadius: "5px",
          p: 2,
          mx: 4,
          boxShadow:
            "0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)"
        }}
        onClick={e => e.stopPropagation()}
        onSubmit={handleChangeFilter}
      >
        <Flex
          sx={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box mb={2}>
            <Label htmlFor="separator">
              Separator (Defaults to ',' [comma])
            </Label>
            <Input
              id="separator"
              type="text"
              defaultValue={filters.separator}
              name="separator"
              placeholder="Separator"
            />
          </Box>
          <Box mb={2}>
            <Label htmlFor="remove">Remove</Label>
            <Input
              id="remove"
              type="text"
              name="remove"
              defaultValue={filters.remove}
              placeholder="Characters to remove"
            />
          </Box>
          <Flex
            sx={{
              justifyContent: "space-around",
              flexDirection: "row"
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <Label htmlFor="upperCase">
                <input
                  id="upperCase"
                  type="checkbox"
                  name="upperCase"
                  defaultChecked={filters.upperCase}
                />
                Upper case
              </Label>
              <Label htmlFor="lowerCase">
                <input
                  id="lowerCase"
                  type="checkbox"
                  name="lowerCase"
                  defaultChecked={filters.lowerCase}
                />
                Lower case
              </Label>
            </Flex>
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Label htmlFor="numbers">
                <input
                  id="numbers"
                  type="checkbox"
                  name="numbers"
                  defaultChecked={filters.numbers}
                />
                Numbers
              </Label>
              <Label htmlFor="symbols">
                <input
                  id="symbols"
                  type="checkbox"
                  name="symbols"
                  defaultChecked={filters.symbols}
                />
                Symbols
              </Label>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            width: "100%",
            justifyContent: "space-between"
          }}
          mt={2}
        >
          <Button
            type="submit"
            sx={{
              width: "140px"
            }}
          >
            Filter
          </Button>
          <Button
            sx={{
              width: "140px"
            }}
            variant="outline.primary"
            onClick={() => setShowFilter(false)}
            type="button"
          >
            Close
          </Button>
        </Flex>
      </Box>
    </Modal>,
    appRoot()
  )
}

export default FilterModal
