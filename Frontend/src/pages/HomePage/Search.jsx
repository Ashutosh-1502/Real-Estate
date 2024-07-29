import {IoSearch} from "react-icons/io5";
export default function Search({inputClassName, placeholder, formClass = null}) {
    return <>
        <form
            className={`md:ms-[10%] mt-8 flex items-center px-5 py-4
             bg-white lg:w-[35%] w-[85%] rounded-lg justify-between size-12 ${formClass}`}>
            <input type="text" placeholder={placeholder} className={inputClassName}/>
            <IoSearch className='text-3xl text-blue-600 cursor-pointer'/>
        </form>
    </>
}