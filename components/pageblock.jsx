export const Pageblock = (props) => {
  const { pageblock, endpage, handlePage } = props;

  const renderPageBlock = () => {
    return pageblock.map((v, i) => {
      return (
        <button
          key={i}
          onClick={() => {
            handlePage(v);
          }}
        >
          {v}
        </button>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => {
          handlePage(1);
        }}
      >
        처음
      </button>
      {renderPageBlock()}
      <button
        onClick={() => {
          handlePage(endpage);
        }}
      >
        끝
      </button>
    </>
  );
};
