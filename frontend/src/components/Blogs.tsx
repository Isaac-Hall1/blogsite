import { FormEvent, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import api from '../api';

interface BlogFormProps {}

const BlogForm: React.FC<BlogFormProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);
  const editorRef = useRef<any>(null);

  /**
   * 
   * @param e: represents an event, takes the content from the input and passes it into this submit
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (editorRef.current) {
        const htmlContent = editorRef.current.getContent()
        const plainText = editorRef.current.getContent({ format: 'text' });
        await api.post('/api/blog/', { title, content: plainText, htmlContent })
            .then((res) => {
            if (res.status !== 201) {
                alert('Failed to create blog');
            }
            setShowForm(false);
            setTimeout(() => {
                setShowForm(true);
                setTitle('');
            }, 2000);
            })
            .catch((error) => alert(error));
        }
    };

  return (
    <div className="">
      {showForm ? (
        <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto">
          <div className="p-3">
            <h1 className="text-6xl font-bold flex justify-center">Create Blog</h1>
          </div>
          <div className='py-6'>
            <input 
              className="text-black p-3 rounded-md w-full "
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="">
            <Editor
              apiKey='48wkofvujnrbtaqayadkh2m5uth2wl4df6an3x55gngq93yw'
              onInit={(editor) => (editorRef.current = editor)}
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tabfocus_elements: ':prev,:next',
                indentation: '20px', // Sets the indentation size
                  setup: (editor) => {
                    editor.addShortcut('ctrl+tab', 'Indent', () => {
                      editor.execCommand('Indent');
                  });
                  editor.on('keydown', (e) => {
                      if (e.key === 'Tab') {
                          e.preventDefault();
                          editor.execCommand('Indent');
                      }
                    });
                  }
              }}
            />
          </div>
          <div className="flex justify-center pt-4">
            <button className="font-bold text-lg w-full text-white focus:ring-4 focus:outline-none rounded-lg p-5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type='submit'>Create Blog</button>
          </div>
        </form>
        ) : (
        <p>Blog Created</p>
        )}
    </div>
  );
}

export default BlogForm;