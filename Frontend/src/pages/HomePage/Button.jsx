import './Home.css';

export default function HomeButton({onClick = null, label}) {
    return <>
        <button className='px-4 py-2' id='home-button'>
            {label}
        </button>
    </>
}