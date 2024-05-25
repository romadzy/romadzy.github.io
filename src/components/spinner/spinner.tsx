import Loading from '../../assets/spinner.svg';

const Spinner = () => {
  return (
    <div className='h-full'>
      <img src={Loading} alt="loading icon" className='w-12 h-12 animation-spin' />
    </div>
  )
}

export default Spinner;