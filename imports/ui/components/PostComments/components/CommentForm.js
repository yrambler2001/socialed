import React, { useState } from 'react'
import { Input, Button, Form } from 'reactstrap';
import { toast } from 'react-toastify';


const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  
  async function handleSubmit(e) {
    e && e.preventDefault();
    try {
      await onSubmit({ text });
      setText('');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message);
    }
  }

  function onKeyDown(e) {
    if (e.keyCode == 13 && e.metaKey) {
      onSubmit();
    }
  }
  
  // useEffect(() => {
  //   document.title = text; 
  // }, [text]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="textarea"
        name="text"
        placeholder="Leave your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default CommentForm;
// export default class CommentForm extends Component {
//   state = {
//     text: ''
//   }

//   onKeyDown = (e) => {
    // if (e.keyCode == 13 && e.metaKey) {
    //   this.onSubmit();
    // }
//   }

//   onChange = (e) => {
//     const { value } = e.target;
//     this.setState({ text: value });
//   }

//   onSubmit = async (e) => {
    // e && e.preventDefault();
    // const { onSubmit } = this.props;
    // const text = this.state.text.trim();
    // try {
    //   await onSubmit({ text });
    //   this.setState({ text: '' });
    // } catch (error) {
    //   toast.error(typeof error === 'string' ? error : error.message);
    // }
//   }   

//   render() {
//     const { text } = this.state;
//     return (
//       <Form onSubmit={this.onSubmit}>
//         <Input
//           type="textarea"
//           name="text"
//           placeholder="Leave your comment..."
//           value={text}
//           onChange={this.onChange}
//           onKeyDown={this.onKeyDown}
//         />
//         <Button type="submit">Submit</Button>
//       </Form>
//     )
//   }
// }
