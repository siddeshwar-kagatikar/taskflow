import Canvas from './Canvas'

export default function Description(props) {

  // console.log(props.data)
  return (
    <div className='my-1'>
      <Canvas data={props.data}/>
    </div>
  )
}
