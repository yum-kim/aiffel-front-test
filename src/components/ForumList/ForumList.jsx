import React, { useState, useEffect, useMemo } from 'react';
import styles from './ForumList.module.scss';
import AppLayout from '../common/AppLayout/AppLayout';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import PostList from '../PostList/PostList';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postSearchRequestAction,
  postByPageRequestAction,
} from '../../reducers/post';
import Loading from '../common/Loading/Loading';
import { Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';

const ForumList = () => {
  const [searchTxt, setSearchText] = useState('');
  const searchInput = useRef();
  const { searchPostLoading, postData, currentPageData } = useSelector(
    (state) => state.post,
  );
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchedByInput, setSearchedByInput] = useState(false);
  const PAGE_LIMIT = 5;
  const [paginationList, setPaginationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchReset, setSearchReset] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  /**
   * 과제 구현사항 중 검색과 pagination 처리를 다른 방법으로 요청하는 것으로 이해해
   * 검색 버튼 클릭 시에는 마운트 시점 서버에서 받은 전체 데이터 중 array filter를 사용해 바인딩하고,
   * 전체 데이터에서 pagination 클릭 시에는 page, limit 값을 파라미터로 넣어 서버로부터 데이터를 받아 바인딩하였습니다.
   */
  const onSubmitSearchPost = (e) => {
    e.preventDefault();
    if (searchTxt.length == 0) return;

    const data = postData.filter((post) => {
      return post.title.includes(searchTxt) || post.content.includes(searchTxt);
    });

    searchInput.current.value = '';
    searchInput.current.focus();
    setSearchedPosts(data);
    setSearchedByInput(true);
    setCurrentPage(1);
  };

  const onResetSearchList = () => {
    setSearchReset((prev) => !prev);
  };

  const onClickPagination = (e) => {
    const page = e.target.getAttribute('page');
    setCurrentPage(page);
  };

  const onMoveAddPost = () => {
    navigate('/forum/add');
  };

  useEffect(() => {
    setSearchedPosts([]);
    setSearchedByInput(false);

    const res = Math.ceil(postData.length / PAGE_LIMIT);
    let list = [];
    for (let i = 1; i <= res; i++) {
      list.push(i);
    }
    setPaginationList(list);
    setCurrentPage(1);
  }, [searchReset]);

  useEffect(() => {
    if (searchedByInput) {
      const res = Math.ceil(searchedPosts.length / PAGE_LIMIT);

      let list = [];
      for (let i = 1; i <= res; i++) {
        list.push(i);
      }

      setPaginationList(list);
    }
  }, [searchedPosts]);

  useEffect(() => {
    if (!searchedByInput) {
      const options = {
        _page: currentPage,
        _limit: PAGE_LIMIT,
        _sort: 'id',
        _order: 'DESC',
      };

      dispatch(postByPageRequestAction(options));
    }
  }, [currentPage]);

  useEffect(() => {
    const res = Math.ceil(postData.length / PAGE_LIMIT);

    let list = [];
    for (let i = 1; i <= res; i++) {
      list.push(i);
    }

    setPaginationList(list);
  }, [postData]);

  useEffect(() => {
    dispatch(postSearchRequestAction({ _sort: 'id', _order: 'DESC' }));
    searchInput.current.focus();
  }, []);

  return (
    <AppLayout>
      {searchPostLoading && <Loading />}
      <section className={styles.forum}>
        <div className={styles.topArea}>
          <h2 className={styles.title}>묻고 답하기</h2>
          <Button name="글쓰기" theme="blue" onClick={onMoveAddPost} />
        </div>

        <article className={styles.searchWrapper}>
          <div className={styles.search}>
            <form onSubmit={onSubmitSearchPost}>
              <Input
                type="text"
                theme="bg"
                placeholder="검색어를 입력하세요."
                onChange={onChangeSearchText}
                ref={searchInput}
                value={searchTxt}
              />
              <Button name="검색" type="submit" />
            </form>
          </div>
          <div className={styles.sorting}>
            {/* <Button name="최신순" theme="gray" order="latest" /> */}
            <div>최신순</div>
          </div>
        </article>
        <article>
          <div className={styles.list}>
            {searchedByInput ? (
              <p>
                검색된 내역 {searchedPosts.length}건/총 {postData.length}건
              </p>
            ) : (
              <p>총 {postData.length}건</p>
            )}
            <Button
              name="검색 초기화"
              theme="blue"
              onClick={onResetSearchList}
            />
          </div>
          <ul>
            {searchedByInput
              ? searchedPosts
                  .slice(
                    (currentPage - 1) * PAGE_LIMIT,
                    (currentPage - 1 + PAGE_LIMIT) * currentPage,
                  )
                  .map((post) => {
                    return <PostList post={post} key={post.id} />;
                  })
              : currentPageData.map((post) => {
                  return <PostList post={post} key={post.id} />;
                })}

            {searchedByInput && searchedPosts.length < 1 && (
              <p className={styles.result}>검색 결과가 없습니다.</p>
            )}
          </ul>
          <div className={styles.pagination}>
            <ol>
              {paginationList.map((page) => {
                return (
                  <li
                    key={page}
                    page={page}
                    active={currentPage == page ? 'true' : 'false'}
                    onClick={onClickPagination}
                  >
                    {page}
                  </li>
                );
              })}
            </ol>
          </div>
        </article>
      </section>
    </AppLayout>
  );
};

export default ForumList;
