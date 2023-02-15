import React from 'react';
import styles from './PostDetail.module.scss';
import AppLayout from '../common/AppLayout/AppLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postDetailRequestAction,
  postLikeRequestAction,
  postDeleteRequestAction,
} from '../../reducers/post';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import Button from '../common/Button/Button';
import Tag from '../common/Tag/Tag';
import Loading from '../common/Loading/Loading';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postDetailData, deletePostLoading } = useSelector(
    (state) => state.post,
  );
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const onToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const onDeletePost = () => {
    if (!window.confirm('게시물을 삭제하시겠습니까?')) return;
    dispatch(postDeleteRequestAction(id));
    setDeleted(true);
  };

  useEffect(() => {
    if (deleted) {
      alert('게시물이 삭제되었습니다.');
      navigate('/forum');
    }
  }, [deleted]);

  useEffect(() => {
    dispatch(postLikeRequestAction({ id, isLiked }));
  }, [isLiked]);

  useEffect(() => {
    setIsLiked(postDetailData.isLiked);
  }, [postDetailData.isLiked]);

  useEffect(() => {
    dispatch(postDetailRequestAction({ id }));
  }, []);

  if (!postDetailData) return null;

  return (
    <AppLayout>
      {deletePostLoading && <Loading />}
      <section className={styles.post}>
        <div className={styles.title}>
          <h3 className={styles.titleTxt}>{postDetailData.title}</h3>
          <Tag tag={postDetailData.tag} />
        </div>
        <div className={styles.content}>
          <p>{postDetailData.content}</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.like} onClick={onToggleLike}>
            {postDetailData.isLiked ? (
              <span className={styles.fullLike}>
                <BsHandThumbsUpFill size="18" />
              </span>
            ) : (
              <span className={styles.emptyLike}>
                <BsHandThumbsUp size="18" />
              </span>
            )}
          </button>
          <span className={styles.delete}>
            <Button name="게시물 삭제" theme="gray" onClick={onDeletePost} />
          </span>
        </div>
      </section>
    </AppLayout>
  );
};

export default PostDetail;
