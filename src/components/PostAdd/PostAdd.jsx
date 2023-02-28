import React, { useState } from 'react';
import styles from './PostAdd.module.scss';
import AppLayout from '../common/AppLayout/AppLayout';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postAddRequestAction } from '../../reducers/post';
import { useEffect } from 'react';

const PostAdd = () => {
  const tagList = [
    {
      name: 'general',
      value: 'general',
    },
    {
      name: 'tip',
      value: 'tip',
    },
    {
      name: 'bug',
      value: 'bug',
    },
    {
      name: 'learn',
      value: 'learn',
    },
  ];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState({ name: 'general' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeTag = (e) => {
    setTag({ name: e.target.value });
  };

  const validation = (addValues) => {
    if (addValues.title == '') {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (addValues.content == '') {
      alert('내용을 입력해주세요.');
      return false;
    }

    if (addValues.tag == '') {
      alert('태그를 선택해주세요.');
      return false;
    }

    return true;
  };

  const onSubmitAddForm = (e) => {
    e.preventDefault();

    const addValues = {
      title,
      content,
      tag,
    };

    const res = validation(addValues);
    if (res && window.confirm('게시물을 등록하시겠습니까?')) {
      dispatch(postAddRequestAction({ ...addValues }));
      setAdded(true);
    }
  };

  useEffect(() => {
    if (added) {
      alert('게시물이 등록되었습니다.');
      navigate('/forum');
    }
  }, [added]);

  return (
    <AppLayout>
      <section className={styles.post}>
        <h3 className={styles.title}>질문을 작성해보세요.</h3>
        <form onSubmit={onSubmitAddForm} className={styles.form}>
          <div className={styles.list}>
            <label htmlFor="title">제목</label>
            <Input
              type="text"
              name="title"
              theme="bg"
              placeholder="제목을 입력해주세요"
              onChange={onChangeTitle}
            />
          </div>
          <div className={styles.list}>
            <label htmlFor="tag">분류</label>
            <select name="tag" onChange={onChangeTag}>
              {tagList.map((tag) => {
                return (
                  <option key={tag.value} value={tag.value}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.list}>
            <label htmlFor="content">질문내용</label>
            <textarea name="content" onChange={onChangeContent}></textarea>
          </div>
          <div className={styles.addBtn}>
            <Button name="등록하기" theme="blue" />
          </div>
        </form>
      </section>
    </AppLayout>
  );
};

export default PostAdd;
