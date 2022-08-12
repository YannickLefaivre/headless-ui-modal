import { useEffect } from "react"
import "./Modal.style.css"

/**
 * @callback onClose
 * @param {MouseEvent | KeyboardEvent} event
 *
 * @returns {void}
 */

/**
 * @typedef {Object} ModalProps
 *
 * @property {Boolean} isOpen
 *
 * @property {String} overlayClassName Allows to
 * customize the style of the background of the
 * modal.
 *
 * - You can name your class whatever you want as
 * long as you don't use the package namespace:
 * `.react-modal-component*`.
 *
 *
 * @property {ReactNode} children Represents the
 * content of the modal.
 *
 * @property {onClose} onClose The callback function
 * that sets isOpen to false.
 *
 *  - This is used to close the modal when clicking
 *  on the background or pressing the `Escape` key.
 */

/**
 * Displays a modal whose content is displayed with
 * the `children` prop when the `isOpen` prop
 * is true.
 *
 * @param {ModalProps} ModalProps
 *
 * @returns {JSX.Element} The modal component
 *
 * @example
 *
 * // YourStylizedModal.jsx
 *
 * import { Modal } from "react-modal-component"
 * ... // other import statements
 *
 * const YourStylizedModal = ({ isOpen, handleClose }) => {
 *   return (
 *     <Modal
 *       isOpen={isOpen}
 *       onClose={handleClose}
 *       overlayClassName="success-modal"
 *     >
 *       <div
 *         className="success-modal__content"
 *       >
 *         <p>Employee created!</p>
 *
 *         <button
 *           autoFocus
 *           onClick={handleClose}
 *           className="button"
 *         >
 *           Close
 *         </button>
 *       </div>
 *     </Modal>
 *   )
 * }
 *
 * // App.jsx
 *
 * import { useState, useRef } from "react"
 * import { YourStylizedModal } from "./path/to/your/component/folder"
 * ... // other import statements
 *
 * const App = () => {
 *   const [isOpen, setIsOpen] = useState(false)
 *
 *   // Allows you to give focus to the last element to have it
 *   // before the modal opened.
 *   const openButtonRef = useRef(null)
 *
 *   const handleClose = () => {
 *     setIsOpen(false)
 *
 *     openButtonRef.current.focus()
 *   }
 *
 *   return (
 *     <>
 *       <header>
 *         <h1>Example modal</h1>
 *       </header>
 *
 *       <main>
 *         <button
 *           ref={openButtonRef}
 *           onClick={() => setIsOpen(true)}
 *           className="button success-button"
 *         >
 *           Open success modal
 *         </button>
 *       </main>
 *
 *       <SuccessModal
 *         isOpen={isOpen}
 *         handleClose={() => setIsOpen(false)}
 *       />
 *     </>
 *   )
 * }
 */
const Modal = ({
  isOpen,
  overlayClassName,
  children,
  onClose,
}) => {
  const handleClose = (event) => {
    document.body.classList.remove("disable-scroll")

    if (event.type === "keyup") {
      if (event.key === "Escape") {
        onClose()
      }
    } else {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("disable-scroll")
    }
  }, [isOpen])

  return (
    <div
      className={`react-modal-component${
        isOpen
          ? ""
          : " react-modal-component--close"
      }`}
      onKeyUp={handleClose}
      onClick={handleClose}
    >
      {isOpen && (
        <div
          className={`react-modal-component__overlay${
            overlayClassName
              ? ` ${overlayClassName}`
              : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export { Modal }