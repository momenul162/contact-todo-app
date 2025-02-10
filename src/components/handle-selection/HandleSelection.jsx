import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const HandleSelection = ({ selected, clearSelections, deleteSelected }) => {
  return (
    <Card className="py-4" open={selected.length > 0} onChange={() => {}}>
      <CardContent className="flex justify-between items-center pb-0">
        <p className="mb-4">You have {selected.length} selected items.</p>
        <Button variant="outline" onClick={clearSelections}>
          Clear Selection
        </Button>
        <Button variant="destructive" onClick={deleteSelected}>
          Delete Selected
        </Button>
      </CardContent>
    </Card>
  );
};

export default HandleSelection;
