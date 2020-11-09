/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import {
  Card,
  Body,
  Loading,
  Touchable,
  Icon,
  Text,
  SearchModal,
} from '~/components';
import { Block } from '~/components';
import { fetchShoesCreator, loadMoreShoesCreator } from '~/modules/shoes/thunk';
import {
  fetchShoesLoadingSelector,
  loadMoreShoesLoadingSelector,
  shoesListSelector,
  lastShoeSelector,
} from '~/modules/shoes/selector';
import theme from '~/config/theme';

const Shoes = () => {
  const shoesList = useSelector(shoesListSelector);
  const fetchShoesLoading = useSelector(fetchShoesLoadingSelector);
  const loadMoreShoesLoading = useSelector(loadMoreShoesLoadingSelector);
  const lastShoe = useSelector(lastShoeSelector);
  const dispatch = useDispatch();

  const fetchShoesList = () => {
    dispatch(fetchShoesCreator());
  };

  useEffect(() => {
    fetchShoesList();
  }, []);

  const loadMoreShoesList = () => {
    dispatch(loadMoreShoesCreator());
  };

  return (
    <Body flex={1} center p="10px 0 0">
      <FlatList
        data={shoesList}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.shoeId}
        refreshControl={
          <RefreshControl
            refreshing={fetchShoesLoading}
            onRefresh={fetchShoesList}
          />
        }
        horizontal={false}
        numColumns={2}
        initialNumToRender={8}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          if (loadMoreShoesLoading) {
            return (
              <Block center p="20px 0 40px">
                <Loading />
              </Block>
            );
          }
          return null;
        }}
        onEndReached={() => {
          if (lastShoe && !loadMoreShoesLoading) {
            loadMoreShoesList();
          }
        }}
      />
      <SearchModal />
    </Body>
  );
};

export default Shoes;
