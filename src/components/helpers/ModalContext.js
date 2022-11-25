import { Modal } from "rsuite";
import { Box, Input, Button, Label } from "theme-ui";

const ModalContext = (props) => {
  const {
    open,
    handleClose,
    hadleClick,
    handleInputChange,
    blog,
    button,
    main_title,
  } = props;
  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));
  return (
    <Modal size="md" open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{main_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box as="form" onSubmit={hadleClick}>
          <Label htmlFor="email">Title</Label>
          <Input
            id="title"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
          />
          <Label htmlFor="Blog_Keywords">Blog Keywords</Label>
          <Input
            id="keywords"
            name="keywords"
            value={blog.keywords}
            onChange={handleInputChange}
          />
          <Label htmlFor="Blog_content">Blog Content</Label>
          <Textarea
            defaultValue={main_title}
            name="blog_text"
            value={blog.blog_text}
            onChange={handleInputChange}
            rows={20}
          />
          <Button>{button}</Button>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalContext;
