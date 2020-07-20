import { useCallback, useEffect, useMemo } from 'react';

// @ts-ignore
import { getJsonConvert } from '../../../shared/utilities/json-convert';
import { useFetch } from '../../../shared/hooks/useFetch';
import { getBackendEndpoint } from '../../../shared/utilities/api';
import { useRemoveModeratorContext } from './RemoveModerator.context';

export function useRemoveModeratorHook() {
  const jsonConvert = useMemo(() => getJsonConvert(), []);

  const {
    setShowForm,
  } = useRemoveModeratorContext();

  const {
    loading, error, post, responseData,
  } = useFetch({
    path: getBackendEndpoint('/asset/search'),
    load: false,
  });

  const initialValues = {
    username: '',
  };

  const onFinish = useCallback(async (values: any) => {
    await post();
  }, []);

  useEffect(() => {
    if (!responseData) {
      return;
    }
    // const postResponse = jsonConvert.deserializeObject(responseData.resource, AssetSearchResponse);
    //
    // if (postResponse.request.status === 'OK') {
    //   setShowForm(false);
    // }
  }, [responseData]);

  return {
    loading,
    error,
    onFinish,
    initialValues,
  };
}
