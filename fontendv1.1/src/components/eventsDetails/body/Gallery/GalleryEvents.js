import ImageGallery from 'react-image-gallery';
import React , {useEffect,useState} from 'react'
import { imageStruted } from '../../../../services/_modules';

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ];



function  GalleryEvents(props)  {
    const [images, setImages] = useState(imageStruted(props.dataEvent.images))

    useEffect(() => {
      
      setImages(imageStruted(props.dataEvent.images))
    
    }, [props.images])

    return (
    <ImageGallery items={images} />
    
    );
  
}

export default GalleryEvents