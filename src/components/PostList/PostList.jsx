import React from 'react';
import styles from './PostList.module.scss';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Tag from '../common/Tag/Tag';

const PostList = ({ post }) => {
  const navigate = useNavigate();

  const onMovePostDetailPage = useCallback((e) => {
    const postId = e.target.closest('li').getAttribute('postid');
    navigate(`/forum/${postId}`);
  });

  return (
    <li className={styles.post} postid={post.id} onClick={onMovePostDetailPage}>
      <div className={styles.lftArea}>
        <div className={styles.like}>
          {post.isLiked ? (
            <BsHandThumbsUpFill size="18" />
          ) : (
            <BsHandThumbsUp size="18" />
          )}
        </div>
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.content}>{post.content}</p>
          <Tag tag={post.tag} />
        </div>
      </div>
      <div className={styles.rhtArea}>
        <span className={styles.time}>5시간전</span>
        {/* <div className={styles.profile}>
          <img src="images/profile.png" alt="프로필 이미지" />
        </div> */}
      </div>
    </li>
  );
};

export default PostList;
