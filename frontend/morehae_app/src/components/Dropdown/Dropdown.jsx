/* single select만 가능한 드롭다운 컴포넌트 */

import { useState, useEffect, useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'

// items: 리스팅 될 아이템들, selectedItem: 선택할 아이템 객체, setSelectedItem: 아이템 객체에 대한 setter
function Dropdown({items, selectedItem, setSelectedItem}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // 드롭다운 클릭에 대한 핸들러
  const handleOpen = () => {
    // 드롭다운 창 닫기
    setIsOpen((oldState) => {
      return !oldState;
    })
  }

  // 아이템 클릭에 대한 핸들러
  const handleSelect = (e) => {
    const index = e.target.value
    if (index === undefined) {  // 가끔씩, 정말 아주 가끔씩 e.target이 <span> 태그를 가리켜
      console.log("?????????????????");  // e.target.value === undefiend가 되는 경우가 있다
      console.log(e);
    } else {
      setSelectedItem((oldState) => {
        return items[index];
      })
    }
    
    // 드롭다운 창 닫기
    setIsOpen((oldState) => {
      return !oldState;
    })
  }

  useEffect(() => {
    // 마우스 클릭이 드롭다운 컴포넌트 외부에 찍혔는지를 판단하기 위한 핸들러
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(() => {
          return false;
        });
      }
    }

    // 핸들러 등록
    document.addEventListener("mousedown", handler);

    // 핸들러 등록 해제
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [])

  return (
    <div className="flex-col relative w-full" ref={menuRef}>
      <button onClick={handleOpen} className="transition bg-white w-full p-4 rounded-lg border hover:border-blue-500 flex justify-between font-extralight items-center">
        <div>{selectedItem.content}</div>
        <div><BsChevronDown/></div>
      </button>
      { isOpen && 
      <ul className="overflow-y-auto max-h-96 bg-white absolute w-full rounded-lg p-2 mt-2 border" style={{boxShadow: '1px 2px 9px rgba(0, 0, 0, 0.07)'}}>
        {items.map((item, index) => {
          let style = "transition p-4 rounded-lg cursor-pointer font-extralight";
          if (item.id === selectedItem.id) {
            style += " bg-blue-500 text-white"
          } else {
            style += " hover:bg-gray-100"
          }
          return <li
            value={index}
            key={item.id}
            onClick={handleSelect}
            className={style}>
              <span>{item.content}</span>
            </li>
        })}
      </ul>
      }
    </div>
  )
}

export default Dropdown;