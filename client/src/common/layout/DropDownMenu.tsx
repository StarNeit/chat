import React, { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  icon: ReactNode;
  options: Record<string, string>[];
  position?: 'left' | 'right';
  onClickMenu: (value: string) => void;
};

const DropDownMenu: React.FC<Props> = ({
  icon,
  options,
  position = 'left',
  onClickMenu
}) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        onClick={handleClick}
        className="w-5 h-5 p-0.5 border border-gray-500 rounded-full">
        {icon}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={clsx(
            'absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            {
              'right-0': position === 'right',
              'left-0': position === 'left'
            }
          )}>
          {options.map((option, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <Menu.Item>
                <div
                  className="text-black text-sm hover:bg-gray-300 py-1 px-2"
                  onClick={() => onClickMenu(option.value)}>
                  {option.label}
                </div>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDownMenu;
