/* eslint-disable no-underscore-dangle */
import Link from 'next/link';

import {
  ClearIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@/components/mui';

import { useUserBasket } from '@/lib/tq/baskets/queries';
import { formatPrice, slugify } from '@/lib/utils/formatters';
import { useRemoveFromBasket } from '@/lib/tq/baskets/mutations';
import { nanoid } from 'nanoid';
import { toDecimal, dinero, add } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';

export default function CheckoutSummaryTable() {
  const { data: basket } = useUserBasket();

  // Remove product from basket
  const removeFromBasketMutate = useRemoveFromBasket();

  const removeFromBasketHandler = (productId) => {
    removeFromBasketMutate.mutate(productId);
  };

  // calculate basket total
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="checkout summary table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(({ _id, title, price }) => (
            <TableRow
              key={nanoid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/products/${slugify(title, _id)}`}>{title}</Link>
              </TableCell>
              <TableCell align="right">
                {formatPrice(
                  toDecimal(dinero({ amount: price * 100, currency: GBP })),
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="remove product from basket"
                  onClick={() => removeFromBasketHandler(_id)}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" component="th" scope="row" colSpan={1}>
              <Typography>Total:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
