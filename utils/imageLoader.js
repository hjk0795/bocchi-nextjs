import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://img.freepik.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="free-vector/burger-restaurant-menu-template-with-illustrations_1361-1505.jpg?w=1480&t=st=1665436786~exp=1665437386~hmac=9049ebecc677613bebedaa1c91568398f1da22da7c6c61eea2f4b13b8f54e156"
      alt="banner"
      width={900}
      height={500}
    />
  )
}

export default MyImage;