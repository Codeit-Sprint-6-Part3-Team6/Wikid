import { useState } from "react"

export default function useModal() {
  const [modalSwitch, setModalSwitch] = useState(false)

  function ToggleModal = () => {
    setModalSwitch(!modalSwitch)
  }

  return [modalSwitch, ToggleModal]
}
