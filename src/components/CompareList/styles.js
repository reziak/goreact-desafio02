import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  position: relative;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 18px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f6;
      }
    }
  }
`;

export const DeleteButton = styled.button`
  color: #f99;
  background: #eee;
  border: none medium transparent;
  text-align: center;
  position: absolute;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 5px;
  cursor: pointer;

  &:hover {
    color: #f66;
  }
`;

export const RefreshButton = styled.button`
  color: #999;
  background: #eee;
  border: none medium transparent;
  text-align: center;
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 5px;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;
