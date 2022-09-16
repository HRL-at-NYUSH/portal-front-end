import React, { useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const options = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
  'Caroline Schultz',
  'Mason Heaney',
  'Claudie Smitham',
  'Emil Schaefer',
];

const MultiSelect = ({ options, selectedItem, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [options]);

  function isSelected(value) {
    return selectedOptions.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedOptionsUpdated = [
        ...selectedOptions,
        options.find((el) => el === value),
      ];
      setSelectedOptions(selectedOptionsUpdated);
      onItemSelected(selectedOptionsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedOptionsUpdated = selectedOptions.filter((el) => el !== value);
    setSelectedOptions(selectedOptionsUpdated);
    onItemSelected(selectedOptionsUpdated);
    setIsOpen(true);
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-xs mx-auto'>
        <Listbox
          as='div'
          className='space-y-1'
          value={selectedOptions}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>
              {/* <Listbox.Label className='block text-sm leading-5 font-medium text-gray-700'>
                Assigned to
              </Listbox.Label> */}
              <div className='relative'>
                <span className='inline-block w-full rounded-md shadow-sm'>
                  <button
                    className='cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-16 py-3 items-center text-left focus:outline-none focus:border-accent-darker transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    open={isOpen}
                  >
                    <span className='block truncate'>
                      {selectedOptions.length < 1
                        ? 'Select options'
                        : `Selected options (${selectedOptions.length})`}
                    </span>
                    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='none'
                        stroke='currentColor'
                      >
                        <path
                          d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                  </button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  className='absolute mt-1 w-full rounded-md bg-white shadow-lg z-10'
                >
                  <Listbox.Options
                    static
                    className='max-h-60 m-0 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'
                  >
                    {options.map((option) => {
                      const selected = isSelected(option);
                      return (
                        <Listbox.Option key={option} value={option}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? 'text-white bg-blue-600'
                                  : 'text-gray-900'
                              } cursor-default select-none relative py-2 pl-8 pr-4 hover:bg-accent hover:text-white`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate whitespace-pre-line`}
                              >
                                {option}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-blue-600'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className='h-5 w-5'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                {/* <div className='pt-1 text-sm'>
                  {selectedPersons.length > 0 && (
                    <>Selected persons: {selectedPersons.join(', ')}</>
                  )}
                </div> */}
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default MultiSelect;
